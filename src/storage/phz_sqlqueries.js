export default {
  insert: ["insert into npsdata (id,date,score,feedback)", "values(?,?,?,?)"],
  getAll:["select id,date,score,feedback from npsdata"
  
],
getLabel:[
"select case when score >= 9 then 'promoter' when score <= 6 then 'detractor' else 'neutral' end as label, count(*) from npsdata group by label order by label"],
  primaryKey: "id",
};

