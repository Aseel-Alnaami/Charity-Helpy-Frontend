TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER `gp1`.`students_BEFORE_INSERT` BEFORE INSERT ON `students` FOR EACH ROW\nset new.password = md5(new.password)' 'CREATE DEFINER=`root`@`localhost` TRIGGER `gp1`.`students_BEFORE_UPDATE` BEFORE UPDATE ON `students` FOR EACH ROW\nbegin\nif new.password <> old.password then\n    SET new.password = md5(new.password);\nend if;\nend'
sql_modes=1098907648 1098907648
definers='root@localhost' 'root@localhost'
client_cs_names='utf8mb4' 'utf8mb4'
connection_cl_names='utf8mb4_general_ci' 'utf8mb4_general_ci'
db_cl_names='utf8mb4_general_ci' 'utf8mb4_general_ci'
created=1713629716687861 1713629716702407
