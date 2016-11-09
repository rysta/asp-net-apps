SELECT kart.kart_id, street.socr ||'. '|| street.name ||' дом '||adhouse.adhousenom, ls.lsflat
FROM psp.kart, psp.ls, psp.adhouse, psp.street
WHERE kart.kart_id = :p_kart_id 
AND kart.ls_id     = ls.ls_id
AND ls.adhouse_id  = adhouse.adhouse_id
AND adhouse.addres_id = street.code