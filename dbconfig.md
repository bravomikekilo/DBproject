
#数据库设计方案

## 数据库
    1. 管理软件采用 PostgreSQL
    2. 名称为 Hospital


## 表的设计

### 医生 doctors
    医生表
    医生代码 serial 主键 null
    医生名称 text  not null
    科室    text  not null
    空闲    boolean  not null
    用户名  text  not null
    密码    text(hash) not null

### 患者 patients
    患者表
    患者代码 serial 主键
    用户名  text not null
    密码    text(hash) not null

### 病历 records
    病历表
    预约号 serial 外键
    患者代码 integer not null
    医生代码
    药物使用 text
    病例描述 text not null



### 预约 reservations
    预约表
    预约号   serial 主键 not null
    日期    date not null
    医生代码 integer not null 约束
    患者代码 integer not null 约束
    预约时间 integer not null 约束


## 视图的设计

### 今日预约
### 空闲医生



