SELECT DISTINCT prop.chel_id, du.duname, prop.dtst, prop.dtfn, street.socr||'. '|| street.name||', д.'||adhouse.adhousenom||case when adhouse.adhousecorp is null then '' else ', корп.'||adhousecorp end||
 ', кв.'|| ls.lsflat
  FROM psp.prop, psp.kart, psp.ls, psp.du, psp.gos, psp.street, psp.adhouse
 WHERE prop.kart_id = kart.kart_id 
   AND kart.ls_id   = ls.ls_id
   AND ls.du_id     = du.du_id
   AND prop.dtfn >= :parameterDateFNFrom
   AND prop.dtfn <= :parameterDateFNBefore
   AND du.du_id in (%parameterDU%) 
    AND ls.adhouse_id = adhouse.adhouse_id
    AND adhouse.addres_id = street.code
ORDER BY du.duname, prop.dtst