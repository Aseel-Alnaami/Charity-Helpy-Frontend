TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER `gp1`.`colleges_BEFORE_INSERT` BEFORE INSERT ON `colleges` FOR EACH ROW\nset new.col_password = md5(new.col_password)' 'CREATE DEFINER=`root`@`localhost` TRIGGER `gp1`.`colleges_BEFORE_UPDATE` BEFORE UPDATE ON `colleges` FOR EACH ROW\nset new.col_password = md5(new.col_password)'
sql_modes=1098907648 1098907648
definers='root@localhost' 'root@localhost'
client_cs_names='utf8mb4' 'utf8mb4'
connection_cl_names='utf8mb4_general_ci' 'utf8mb4_general_ci'
db_cl_names='utf8mb4_general_ci' 'utf8mb4_general_ci'
created=1717435446987899 1717435447020204
