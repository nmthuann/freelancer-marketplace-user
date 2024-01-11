```shell
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
```

> FOR EXAMPLE

```shell
docker run --name mysql-container -p 3307:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:8.2.0 --max_connections=1000
```

# Login vào Docker để sử MYSQL đó

```shell
docker exec -it mysql-container bash
```

# Login with mysql

```bash
docker exec -it mysql-container bash
```

# Create USER

```bash
CREATE USER 'admin-user-service'@'%' IDENTIFIED BY '123456';
```

# Create DATABASE

```bash
create database freelancer-marketplace-user;
```

# SET PERMISSION for USER

```bash
GRANT ALL PRIVILEGES ON FreelancerMarketplaceUser.* TO 'admin-user-service'@'%';
```

# FLUSH (cap quyen)

```bash
FLUSH PRIVILEGES;
```

```shell
docker build --tag freelancer-marketplace-user1.0 .
```

docker-compose up -d --no-deps --build freelancer-marketplace-user
docker build -t freelancer-marketplace-user1.0 .
docker-compose restart freelancer-marketplace-user
