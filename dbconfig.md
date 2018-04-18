
# 数据库设计方案

## 数据库
    1. 管理软件采用 PostgreSQL
    2. 名称为 Hospital


## 表的设计

### 医生 doctors
医生表

列 | 列名 | 类型
---| ---| ---
医生代码 | id | serial 主键 null
医生名称 | name | text  not null
科室  | office |  text  not null
空闲  | idle |  boolean  not null
用户名 | username |  text  not null
密码  | password | text(hash) not null

### 患者 patients
患者表

列 | 列名 | 类型
---| --- | ---
患者代码| id      | serial 主键
用户名 | username | text not null
密码  | password  |  text(hash) not null

### 病历 records
病历表


列   | 列名 | 类型
-----|-----|------
预约号| id  | serial 外键
患者代码| pid | integer not null
医生代码| did | integer not null
药物使用| medicine | text
病例描述| description | text not null



### 预约 reservations
预约表

列 | 列名 | 类型
--- | --- | ---
预约号 | id | serial 主键 not null
日期   | date | date not null
医生代码 | did | integer not null 约束
患者代码 | pid | integer not null 约束
预约时间 | time | integer not null 约束


## 视图的设计

### 今日预约
### 空闲医生



