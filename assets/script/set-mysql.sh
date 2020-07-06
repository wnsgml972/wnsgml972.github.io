sudo apt-get install mysql-server-5.7  # mysql 다운
cat /dev/null > /etc/mysql/conf.d/mysql.cnf # utf-8 설정하는데 기존 설정 제거 밑에는 utf-8 설정
echo "[mysqld]
 datadir=/var/lib/mysql
 socket=/var/lib/mysql/mysql.sock
 user=mysql
 character-set-server=utf8
 collation-server=utf8_general_ci
 init_connect = set collation_connection = utf8_general_ci
 init_connect = set names utf8
 
 [mysql]
 default-character-set=utf8
 
 [mysqld_safe]
 log-error=/var/log/mysqld.log
 pid-file=/var/run/mysqld/mysqld.pid
 default-character-set=utf8
 
 [client]
 default-character-set=utf8
 
 [mysqldump]
 default-character-set=utf8" > /etc/mysql/conf.d/mysql.cnf

sudo ufw allow 3306/tcp # tcp port 허용
sudo /etc/init.d/mysql restart # 다시 시작
mysql -uroot -p1
status
