using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RircApps.Areas.PSP.Models
{
    /// <summary>
    /// Класс шаблон для формирования списка.
    /// </summary>
    public class TemplateForJsonResponse
    {
        public Nullable<int> NumberStepByStep { get; set; }

        public Nullable<int> NumberPRU { get; set; }
		
        public string FIO { get; set; }
		
        public string DateOfBirth { get; set; }

        public string RegAddres { get; set; }

        public string DateRegOut { get; set; }
        public string RegDate { get; set; }

        public string WhichSent { get; set; }

        public string RegType { get; set; }

        public string DateOfDeath { get; set; }

        public string RegulatoryOrganization { get; set; }

        public string PassportWhoGive { get; set; }

    }
}