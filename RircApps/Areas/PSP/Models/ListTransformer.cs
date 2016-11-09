using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RircApps.Areas.PSP.Models
{
    /// <summary>
    /// Класс сожержит методы для преобразования из List<TemplateForJsonResponse> в string[,]
    /// </summary>
    public static class ListTransformer
    {
        /// <summary>
        /// Возвращает двумерный массив для отчёта "Все выписанные за период" переделанный из List.
        /// </summary>
        /// <param name="list">List<TemplateForJsonResponse></param>
        /// <returns></returns>
        public static string[,] ListToArrayForWriteOut( List<TemplateForJsonResponse> list ) {

            string[,] arr = new string[list.Count + 1, 10];
            arr[0, 0] = "ПРУ";
            arr[0, 1] = "№ п/п";
            arr[0, 2] = "Фамилия, имя, отчество";
            arr[0, 3] = "День месяц и год рождения";
            arr[0, 4] = "Адрес регистрации";
            arr[0, 5] = "Дата снятия с регистрационного учета";
            arr[0, 6] = "Куда выбыл";
            arr[0, 7] = "Вид регистрации";
            arr[0, 8] = "Дата смерти";
            arr[0, 9] = "Управляющая организация";

            for ( int i = 1; i <= list.Count; i++ )
            {
                arr[i, 0] = list[i - 1].NumberPRU.ToString();
                arr[i, 1] = list[i - 1].NumberStepByStep.ToString();
                arr[i, 2] = list[i - 1].FIO.ToString();
                arr[i, 3] = list[i - 1].DateOfBirth.ToString();
                arr[i, 4] = list[i - 1].RegAddres.ToString();
                arr[i, 5] = list[i - 1].DateRegOut.ToString();
                arr[i, 6] = list[i - 1].WhichSent.ToString();
                arr[i, 7] = list[i - 1].RegType.ToString();
                arr[i, 8] = list[i - 1].DateOfDeath.ToString();
                arr[i, 9] = list[i - 1].RegulatoryOrganization.ToString();
            }
            return arr;
        }

        /// <summary>
        /// Возвращает двумерный массив для отчёта "Все прибывшие военнообязанные" переделанный из List.
        /// </summary>
        /// <param name="list">List<TemplateForJsonResponse></param>
        /// <returns></returns>
        public static string[,] ListToArrayForArrivedMilitary( List<TemplateForJsonResponse> list )
        {
            string[,] arr = new string[list.Count + 1, 10];
            arr[0, 0] = "ПРУ";
            arr[0, 1] = "№ п/п";
            arr[0, 2] = "Фамилия, имя, отчество";
            arr[0, 3] = "День месяц и год рождения";
            arr[0, 4] = "Адрес регистрации";
            arr[0, 5] = "Дата регистрации";
            arr[0, 6] = "Откуда прибыл";
            arr[0, 7] = "Вид регистрации";
            arr[0, 8] = "Кем выдан паспорт";
            arr[0, 9] = "УК";

            for ( int i = 1; i <= list.Count; i++ )
            {
                arr[i, 0] = list[i - 1].NumberPRU.ToString();
                arr[i, 1] = list[i - 1].NumberStepByStep.ToString();
                arr[i, 2] = list[i - 1].FIO.ToString();
                arr[i, 3] = list[i - 1].DateOfBirth.ToString();
                arr[i, 4] = list[i - 1].RegAddres.ToString();
                arr[i, 5] = list[i - 1].DateRegOut.ToString();
                arr[i, 6] = list[i - 1].WhichSent.ToString();
                arr[i, 7] = list[i - 1].RegType.ToString();
                arr[i, 8] = list[i - 1].PassportWhoGive.ToString();
                arr[i, 9] = list[i - 1].RegulatoryOrganization.ToString();
            }
            return arr;
        }
        /// <summary>
        /// Возвращает двумерный массив для отчёта "Все прибывшие военнообязанные" переделанный из List.
        /// </summary>
        /// <param name="list">List<TemplateForJsonResponse></param>
        /// <returns></returns>
        public static string[,] ListToArrayForDropOutMilitary( List<TemplateForJsonResponse> list )
        {
            string[,] arr = new string[list.Count + 1, 11];
            arr[0, 0] = "ПРУ";
            arr[0, 1] = "№ п/п";
            arr[0, 2] = "Фамилия, имя, отчество";
            arr[0, 3] = "День месяц и год рождения";
            arr[0, 4] = "Адрес регистрации";
            arr[0, 5] = "Дата снятия с регистрационного учета";
            arr[0, 6] = "Куда выбыл";
            arr[0, 7] = "Вид регистрации";
            arr[0, 8] = "Дата смерти";
            arr[0, 9] = "Кем выдан паспорт";
            arr[0, 10] = "УК";

            for ( int i = 1; i <= list.Count; i++ )
            {
                arr[i, 0] = list[i - 1].NumberPRU.ToString();
                arr[i, 1] = list[i - 1].NumberStepByStep.ToString();
                arr[i, 2] = list[i - 1].FIO.ToString();
                arr[i, 3] = list[i - 1].DateOfBirth.ToString();
                arr[i, 4] = list[i - 1].RegAddres.ToString();
                arr[i, 5] = list[i - 1].DateRegOut.ToString();
                arr[i, 6] = list[i - 1].WhichSent.ToString();
                arr[i, 7] = list[i - 1].RegType.ToString();
                arr[i, 8] = list[i - 1].DateOfDeath.ToString();
                arr[i, 9] = list[i - 1].PassportWhoGive.ToString();
                arr[i, 10] = list[i - 1].RegulatoryOrganization.ToString();
            }
            return arr;
        }

        /// <summary>
        /// Возвращает двумерный массив для отчёта "Изменение численного состава" переделанный из List.
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        public static string[,] ListToArrayForStrengthChange( List<TemplateForJsonResponse> list )
        {
            string[,] arr = new string[list.Count + 1, 5];

            arr[0, 0] = "№ п/п";
            arr[0, 1] = "Адрес регистрации";
            arr[0, 2] = "Наименование УК";
            arr[0, 3] = "Дата регистрации";
            arr[0, 4] = "Дата убытия";

            for ( int i = 1; i <= list.Count; i++ )
            {
                arr[i, 0] = list[i - 1].NumberStepByStep.ToString();
                arr[i, 1] = list[i - 1].RegAddres.ToString();
                arr[i, 2] = list[i - 1].RegulatoryOrganization.ToString();
                arr[i, 3] = list[i - 1].RegDate.ToString();
                arr[i, 4] = list[i - 1].DateRegOut.ToString();
            }
            return arr;
        }
    }
}