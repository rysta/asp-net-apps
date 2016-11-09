using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RircApps.Areas.PSP.Models
{
    /// <summary>
    /// Класс хранилище
    /// </summary>
    public static class Storage
    {
        static List<TemplateForJsonResponse> storageStrengthChangeRegistration;
        static List<TemplateForJsonResponse> storageStrengthChangeDropOut;
        static List<TemplateForJsonResponse> storageUnivarsalField;

        public static List<TemplateForJsonResponse> StorageItemsStrengthChangeRegistration
        {
            get
            {
                return storageStrengthChangeRegistration;
            }

            set
            {
                storageStrengthChangeRegistration = value;
            }
        }

        public static List<TemplateForJsonResponse> StorageItemsStrengthChangeDropOut
        {
            get
            {
                return storageStrengthChangeDropOut;
            }

            set
            {
                storageStrengthChangeDropOut = value;
            }
        }

        public static List<TemplateForJsonResponse> StorageUnivarsalField
        {
            get
            {
                return storageUnivarsalField;
            }

            set
            {
                storageUnivarsalField = value;
            }
        }

    }
}