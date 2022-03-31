export default {
  host: "localhost",
  port: 3306,
  admin: "root",
  adminpassword: "",
  user: "HR",
  userpassword: "password",
  dropuser: true,
  debug: true,
  database: "npsdb",
  tables: [
    {
      tableName: "npsdata",
      columns: [
        "employeeid integer not null primary key",
        "date Date not null",
        "score integer not null",
        "feedback varchar(150) not null",
      ],
      data: [
        [101, "2018-06-03", 10, "Best organization "],
        [103, "2018-04-14", 9, "Great skills"],
        [104, "2018-09-13", 6, "Not impressed"],
        [105, "2018-02-03", 4, "not well organized"],
      ],
    },
  ],
};