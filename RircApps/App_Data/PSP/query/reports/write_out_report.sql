select case when stol.stol_id = 10 then 'Новозыбков' else case when stol.stol_id = 9 then 'Карачев' else to_char(stoluch, '99') end end as pru, doktchel.famil||' '|| coalesce(doktchel.imya, '')||' '|| coalesce(doktchel.otch, '') as fio,
		to_char(dtrd, 'DD.MM.YYYY')||' г.',
		street.socr||'. '|| street.name||', д.'
		||adhouse.adhousenom||
		case when adhouse.adhousecorp is null then '' else ', корп.'||adhousecorp end||
	', кв.'|| ls.lsflat as adr, to_char(prop.dtfn, 'DD.MM.YYYY')||' г.', ubt, case when prop = 1 then 'Постоянно' else 'Временно' end as pr,
	case when chel.dtsm is not null then to_char(chel.dtsm, 'DD.MM.YYYY')||' г.' else '' end, du.duname
	from psp.doktchel, psp.gos, psp.street, psp.adhouse, psp.ls, psp.chel, psp.prop, psp.kart, psp.stol, psp.dvizh, psp.du
	where stol.stol_id <> 99
		and prop.dtfn >= :parameterDateFrom
		and prop.dtfn <= :parameterDateBefore
		and ls.stol_id in (1,2,3,4,5,6,7,8)
		and ls.du_id	 = du.du_id
		and chel.chel_id = doktchel.chel_id
		and prop.chel_id = chel.chel_id
		and prop.kart_id = kart.kart_id
		and ls.stol_id = stol.stol_id
		and kart.ls_id = ls.ls_id
		and prop in (1,2)
		and dvizh.prop_id = prop.prop_id
		and ls.adhouse_id = adhouse.adhouse_id
		and adhouse.addres_id = street.code
		and doktchel.gos_id = gos.gos_id
	order by pru, famil, imya, otch, street.name, adhousenom