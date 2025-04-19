TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER `gp1`.`withdraw_BEFORE_UPDATE` BEFORE UPDATE ON `withdraw` FOR EACH ROW\nBEGIN\n    DECLARE y VARCHAR(15);\n    DECLARE txt1 VARCHAR(50);\n    DECLARE txt VARCHAR(150);\n    DECLARE cor VARCHAR(150);\n    DECLARE s int(1);\nselect year,smst into y,s from univ_calendar\nwhere now() between smst_start and smst_end; \n\nselect cor_name into cor from courses where cor_id=new.w_corid;\nif (new.w_status <> old.w_status) then\nif new.w_status=1 then\nset txt1 = "قام المدرس بالموافقة على طلب اسقاط المادة ";\nend if;\nif new.w_status=2 then\nset txt1 = "قام رئيس القسم بالموافقة على طلب اسقاط مادة ";\nend if;\nif new.w_status=3 then\nset txt1 = "قام عميد الكلية بالموافقة على طلب اسقاط مادة ";\nend if;\n\nif new.w_status=-1 then\nset txt1 = "قام المدرس برفض طلب اسقاط مادة ";\nend if;\nif new.w_status=-2 then\nset txt1 = "قام ريس القسم برفض طلب اسقاط مادة ";\nend if;\nif new.w_status=-3 then\nset txt1 = "قام عميد الكلية برفض طلب اسقاط مادة ";\nend if;\n\n\nset txt = concat(concat(concat(txt1,cor)," شعبة "),new.w_class);\ninsert into st_notification(not_studentid,not_year,not_smst,not_text,not_date,not_status) \nvalues(new.w_studentid,y,s,txt,now(),1);\nend if;\nEND'
sql_modes=1098907648
definers='root@localhost'
client_cs_names='utf8mb4'
connection_cl_names='utf8mb4_general_ci'
db_cl_names='utf8mb4_general_ci'
created=1717592861816453
