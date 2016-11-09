UPDATE psp.ls SET lsflat= :p_ls_flat 
WHERE ls_id 
	     IN (SELECT ls.ls_id FROM psp.kart, psp.ls WHERE kart.kart_id = :p_kart_id AND kart.ls_id = ls.ls_id);