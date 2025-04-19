TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER `gp1`.`departments_BEFORE_INSERT` BEFORE INSERT ON `departments` FOR EACH ROW\nset new.dept_password = md5(new.dept_password)' 'CREATE DEFINER=`root`@`localhost` TRIGGER `gp1`.`departments_BEFORE_UPDATE` BEFORE UPDATE ON `departments` FOR EACH ROW\nset new.dept_password = md5(new.dept_password)'
sql_modes=1098907648 1098907648
definers='root@localhost' 'root@localhost'
client_cs_names='utf8mb4' 'utf8mb4'
connection_cl_names='utf8mb4_general_ci' 'utf8mb4_general_ci'
db_cl_names='utf8mb4_general_ci' 'utf8mb4_general_ci'
created=1717435447310226 1717435447343210
