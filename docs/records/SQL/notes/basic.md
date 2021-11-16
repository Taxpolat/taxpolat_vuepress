---
title: 【MySQL】MySQL基础知识
date: 2021-11-16
sidebar: 'auto'
author: 'Taxpolat'
categories:
 - MySQL
tags:
 - MySQL
---

### 什么是SQL？
:::tip 
简单地说,SQL就是访问和处理数据库的计算机标准语言。
1. SQL 指结构化查询语言
2. SQL 使我们有能力访问数据库
3. SQL 是一种 ANSI 的标准计算机语言
:::
### SQL能做什么？
1. SQL 面向数据库执行查询
2. SQL 可从数据库取回数据
3. SQL 可在数据库中插入新的记录
4. SQL 可更新数据库中的数据
5. SQL 可从数据库删除记录
6. SQL 可创建新数据库
7. SQL 可在数据库中创建新表
8. SQL 可在数据库中创建存储过程
9. SQL 可在数据库中创建视图
10. SQL 可以设置表、存储过程和视图的权限   
### RDBMS
`RDBMS` 指的是关系型数据库管理系统。   
`RDBMS` 中的数据存储在被称为表（tables）的数据库对象中。   
__表是相关的数据项的集合，它由列和行组成__
### 数据库表
__`表`是相关的数据项的集合，它由列和行组成。__   
一个数据库通常包含一个或者多个表，每个表由一个名字表示（'user'或者'order'等）。
`表`包含带有数据的记录（表的行）

### SQL语句
__数据库上执行的大部分工作都由`SQL语句`完成__   
如：
```sql
SELECT LastName FROM Persons
```
结果为：获取Persons表里的所有lastName的列
:::danger
__一定要记住，SQL 对大小写不敏感！__   
:::
### SQL语句后面的分号？
分号是在数据库系统中分隔每条 SQL 语句的标准方法，
这样就可以在对服务器的相同请求中执行一条以上的语句。
### SQL DML 和 DDL
:::warning
可以把 SQL 分为两个部分：数据操作语言 (DML) 和 数据定义语言 (DDL)。
SQL (结构化查询语言)是用于执行查询的语法。但是 SQL 语言也包含用于更新、插入和删除记录的语法
:::
1. SQL中DML部分：  
  `查询和更新指令构成了 SQL 的 DML 部分` 
  - SELECT - 从数据库表中获取数据
  - UPDATE - 更新数据库表中的数据
  - DELETE - 从数据库表中删除数据
  - INSERT INTO - 向数据库表中插入数据
2. SQL DDL 语句:   
  `SQL 的数据定义语言 (DDL) 部分使我们有能力创建或删除表格。我们也可以定义索引（键），规定表之间的链接，以及施加表间的约束。`
  - CREATE DATABASE - 创建新数据库
  - ALTER DATABASE - 修改数据库
  - CREATE TABLE - 创建新表
  - ALTER TABLE - 变更（改变）数据库表
  - DROP TABLE - 删除表
  - CREATE INDEX - 创建索引（搜索键）
  - DROP INDEX - 删除索引
### :vulcan_salute:  SQL SELECT 语句
__SELECT 语句用于从表中选取数据。结果被存储在一个结果表中（称为结果集）__

SQL SELECT 语法: 
```sql
-- 获取指定列的所有数据
SELECT 列名称 FROM 表名称  
以及
-- 获取表里所有的数据
SELECT * FROM 表名称
```
:::warning
注释：SQL 语句对大小写不敏感。SELECT 等效于 select。
:::
SQL SELECT 实例：   
user表：
|id | name  |city| age|
|---|:------|:--:| --:|
| 1 | James | LA | 36 |
| 2 | Rose  | NY | 32 |
| 3 | Durant| NYB| 32 |

```sql
SELECT name,city FROM user;
```
结果：  
| name  |city|
|:------|:--:|
| James | LA |
| Rose  | NY |
| Durant| NYB|


### :vulcan_salute:  SQL SELECT DISTINCT 语句
在表中，可能会包含重复值。这并不成问题，不过，有时您也许希望仅仅列出不同（distinct）的值。
关键词 DISTINCT 用于返回唯一不同的值。

user 表：
|id | name  |city| age|
|---|:------|:--:| --:|
| 1 | James | LA | 36 |
| 2 | Rose  | NY | 32 |
| 3 | Durant| NYB| 32 |

```sql
SELECT age FROM user
```
结果：
| age|
| --:|
| 36 |
| 32 |
| 32 |
有 两条age=32的数据；

如需从 age" 列中仅选取唯一不同的值，我们需要使用 SELECT DISTINCT 语句
```sql
SELECT DISTINCT age FROM user 
```
结果： 
| age|
| --:|
| 36 |
| 32 |
`DISTINCT`可以帮我们去重的操作
### :vulcan_salute:  SQL WHERE 子句
__WHERE 子句用于规定选择的标准。__

user表：
|id | name  |city| age|
|---|:------|:--:| --:|
| 1 | James | LA | 36 |
| 2 | Rose  | NY | 32 |
| 3 | Durant| NYB| 32 |

```sql
SELECT * FROM `user` WHERE name= 'Rose';
```
结果：
|id | name  |city| age|
|---|:------|:--:| --:|
| 2 | Rose  | NY | 32 |
```sql
SELECT name,city FROM `user` WHERE name= 'Rose';
```
结果：   
| name  |city|
|:------|:--:|
| Rose  | NY |

下面的运算符可在 WHERE 子句中使用：
1. =	 :等于
2. <>	 :不等于
3. `>` :大于
4. <	 :小于
5. `>=`:大于等于
6. <=	小于等于
7. BETWEEN	在某个范围内
8. LIKE	搜索某种模式
:::warning
__引号的使用__
请注意，我们在例子中的条件值周围使用的是单引号。   
SQL 使用单引号来环绕 __文本值__（大部分数据库系统也接受双引号）。如果是 __数值__，请不要使用引号。
:::
### :vulcan_salute:  SQL AND & OR 运算符
AND 和 OR 运算符用于基于一个以上的条件对记录进行过滤。  
 :::warning
__AND 和 OR 运算符__   
AND 和 OR 可在 WHERE 子语句中把两个或多个条件结合起来。  
如果第一个条件和第二个条件都成立，则 AND 运算符显示一条记录。   
如果第一个条件和第二个条件中只要有一个成立，则 OR 运算符显示一条记录。   
:::
user 表
|LastName|	FirstName|	Address|	City  |
|--------| --------  | --------|------  |
| Adams  |	John     |	Oxford | London |
|  Bush  |	George   |	Fifth  |New York|
| Carter |	Thomas   | Changan | Beijing|
| Carter |	William  |Xuanwumen| Beijing|

AND 运算符实例
使用 AND 来显示所有姓为 "Carter" 并且名为 "Thomas" 的人：
```sql
SELECT * FROM user WHERE FirstName='Thomas' AND LastName='Carter'
```
结果：
|LastName|	FirstName|	Address|	City  |
|--------| --------  | --------|------  |
| Carter |	Thomas   | Changan | Beijing|
OR 运算符实例
使用 OR 来显示所有姓为 "Carter" 或者名为 "Thomas" 的人：
```sql
SELECT * FROM Persons WHERE firstname='Thomas' OR lastname='Carter'
```
|LastName|	FirstName|	Address|	City  |
|--------| --------  | --------|------  |
| Carter |	Thomas   | Changan | Beijing|
| Carter |	William  |Xuanwumen| Beijing|

### :vulcan_salute:  SQL ORDER BY 子句

__ORDER BY 语句用于对结果集进行排序。__
:::warning
__ORDER BY 语句__   
ORDER BY 语句用于根据指定的列对结果集进行排序。  
ORDER BY 语句默认按照升序对记录进行排序。  
如果您希望按照降序对记录进行排序，可以使用 DESC 关键字。  
:::
user表：
|id | name  |city| age|
|---|:------|:--:| --:|
| 1 | James | LA | 36 |
| 2 | Rose  | NY | 32 |
| 3 | Durant| NYB| 31 |

```sql
SELECT * FROM user ORDER BY age
```
结果：
|id | name  |city| age|
|---|:------|:--:| --:|
| 3 | Durant| NYB| 31 |
| 2 | Rose  | NY | 32 |
| 1 | James | LA | 36 |

```sql
SELECT * FROM user ORDER BY age DESC
```
结果：
|id | name  |city| age|
|---|:------|:--:| --:|
| 1 | James | LA | 36 |
| 2 | Rose  | NY | 32 |
| 3 | Durant| NYB| 31 |
```sql
SELECT * FROM user ORDER BY age ASC
```
结果：
|id | name  |city| age|
|---|:------|:--:| --:|
| 3 | Durant| NYB| 31 |
| 2 | Rose  | NY | 32 |
| 1 | James | LA | 36 |

### :vulcan_salute:  SQL INSERT INTO 语句
__INSERT INTO 语句用于向表格中插入新的行。__   
user:
|id | name  |city| age|
|---|:------|:--:| --:|
| 1 | James | LA | 36 |
| 2 | Rose  | NY | 32 |
| 3 | Durant| NYB| 31 |

```sql
INSERT INTO user VALUES ('Curry', 'GSW',32)
```

结果：
|id | name  |city| age|
|---|:------|:--:| --:|
| 1 | James | LA | 36 |
| 2 | Rose  | NY | 32 |
| 3 | Durant| NYB| 31 |
| 4 | Curry | GSW| 32 |

```sql
INSERT INTO user (name, city) VALUES ('Luka', 'Dallas')
```
|id | name  |city| age|
|---|:------|:--:| --:|
| 1 | James | LA | 36 |
| 2 | Rose  | NY | 32 |
| 3 | Durant| NYB| 31 |
| 4 | Curry | GSW| 32 |
| 5 | Luka  | Dallas| 22  |

### :vulcan_salute:  SQL UPDATE 语句
__Update 语句用于修改表中的数据。__
```sql
UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
```

user:
|id | name  |city| age|
|---|:------|:--:| --:|
| 1 | James | LA | 36 |
| 2 | Rose  | NY | 32 |

```sql
UPDATE user SET name = 'Durant' WHERE id = 1
```
结果：
|id | name  |city| age|
|---|:------|:--:| --:|
| 1 | Durant | LA | 36 |
| 2 | Rose  | NY | 32 |

user:
|id | name  |city| age|
|---|:------|:--:| --:|
| 1 | James | LA | 36 |
| 2 | Rose  | NY | 32 |
```sql
UPDATE user SET name = 'Antetokounmpo', City = 'Milwaukee',age = 27 WHERE id = 1
```
结果：
|id | name  |city| age|
|---|:------|:--:| --:|
| 1 | Antetokounmpo | Milwaukee | 27 |
| 2 | Rose  | NY | 32 |

### :vulcan_salute:  SQL DELETE 语句
__DELETE 语句用于删除表中的行。__
user:
|id | name  |city| age|
|---|:------|:--:| --:|
| 1 | James | LA | 36 |
| 2 | Rose  | NY | 32 |
| 3 | Durant| NYB| 31 |
| 4 | Curry | GSW| 32 |
| 5 | Luka  | Dallas| 22  |
```sql
DELETE FROM user WHERE id = 1 
```
结果：
|id | name  |city| age|
|---|:------|:--:| --:|
| 2 | Rose  | NY | 32 |
| 3 | Durant| NYB| 31 |
| 4 | Curry | GSW| 32 |
| 5 | Luka  | Dallas| 22  |

```sql
-- 可以在不删除表的情况下删除所有的行
DELETE FROM table_name 
-- or  
DELETE * FROM table_name 
```