SELECT kart.kart_id, chel.chel_id, chel.dtrd, doktchel.famil ||' '||doktchel.imya||' '||doktchel.otch 
FROM psp.kart, psp.ls, psp.prop, psp.chel, psp.doktchel
WHERE kart.kart_id   = :p_kart_id
AND kart.ls_id       = ls.ls_id
AND prop.kart_id     = kart.kart_id
AND prop.chel_id     = chel.chel_id
AND doktchel.chel_id = prop.chel_id

UNION

SELECT kart.kart_id, kart.ls_id, null, null
FROM psp.kart
WHERE kart_id = :p_kart_id