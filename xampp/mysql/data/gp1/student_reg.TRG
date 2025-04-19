TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER `gp1`.`student_reg_BEFORE_UPDATE` BEFORE UPDATE ON `student_reg` FOR EACH ROW\nBEGIN\n    DECLARE y VARCHAR(15);\n    DECLARE txt1 VARCHAR(50);\n    DECLARE txt VARCHAR(150);\n    DECLARE cor VARCHAR(150);\n    DECLARE s int(1);\nselect year,smst into y,s from univ_calendar\nwhere now() between smst_start and smst_end; \n\nselect cor_name into cor from courses where cor_id=new.reg_cor_id;\nif (new.deprived_f <> old.deprived_f) then\n	if new.deprived_f=1 then\n		 set txt1 = "تم حرمانك بسبب الغياب في مادة ";\n	end if;\n	if new.deprived_f=0 then\n		set txt1 = "تم الغاء الحرمان بسبب الغياب ي مادة ";\n	end if;\n\n	set txt = concat(concat(concat(txt1,cor)," شعبة "),new.reg_class);\n	insert into st_notification(not_studentid,not_year,not_smst,not_text,not_date,not_status)\n    values(new.reg_student_id,y,s,txt,now(),1);\nend if;\nif (new.withdraw_f <> old.withdraw_f) then\n	if new.withdraw_f=1 then\n		 set txt1 = "تم اجراء حركة اسقاط مادة ";\n	end if;\n	if new.withdraw_f=0 then\n		set txt1 = "تم الغاء حركة اسقاط مادة ";\n	end if;\n\n	set txt = concat(concat(concat(txt1,cor)," شعبة "),new.reg_class);\n	insert into st_notification(not_studentid,not_year,not_smst,not_text,not_date,not_status)\n    values(new.reg_student_id,y,s,txt,now(),1);\nend if;\nEND'
sql_modes=1098907648
definers='root@localhost'
client_cs_names='utf8mb4'
connection_cl_names='utf8mb4_general_ci'
db_cl_names='utf8mb4_general_ci'
created=1717435447845731
