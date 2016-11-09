using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Npgsql;
using System.Resources;
using System.Text.RegularExpressions;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml;

namespace RircApps.Areas.PSP.Models
{
    public class Template {
        public Nullable<int> Du_id { get; set; }
        public string DuName { get; set; }
    }

    public static class StrengthChangeReport
    {
        /// <summary>
        /// Возвращается список du
        /// </summary>
        /// <returns></returns>
        public static List<Template> GetDUItems()
        {
            try
            {
                NpgsqlConnection conn = new NpgsqlConnection( Server=***.***.***.***;Port=***;User Id=***;Password=***;Database=***; );
                conn.Open();
                NpgsqlCommand command = conn.CreateCommand();
                command.CommandText = Resources.ResourceQuery.du_query;
                NpgsqlDataReader reader = command.ExecuteReader();

                List<Template> list = new List<Template>();
                while ( reader.Read() )
                {
                    Template templ = new Template();

                    templ.Du_id  = Convert.ToInt32(reader.GetValue( 0 ));
                    templ.DuName = reader.GetValue( 1 ).ToString();

                    list.Add( templ );
                }
                reader.Close();
                conn.Close();
                return list;
            }
            catch ( Exception ex )
            {
                List<Template> list = new List<Template>();
                list.Add( new Template { DuName = ex.Message.ToString() } );
                return list;
            }
        }
        /// <summary>
        ////Возвращает список адресов по которым была регистрация.
        /// </summary>
        /// <param name="dateFrom">Дата с.</param>
        /// <param name="dateBefore">Дата по.</param>
        /// <param name="duItems">Список du_id по которым будет поиск.</param>
        /// <returns>List<TemplateForJsonResponse></returns>
        public static List<TemplateForJsonResponse> GetStrengthChangeRegistrationReport( string dateFrom, string dateBefore, string duItems )
        {
            try
            {
                NpgsqlConnection conn = new NpgsqlConnection( Server=***.***.***.***;Port=***;User Id=***;Password=***;Database=***; );
                conn.Open();
                NpgsqlCommand command = conn.CreateCommand();

                string find = @"%parameterDU%";
                string registrationStrengthChange = Regex.Replace( Resources.ResourceQuery.registration_strength_change, find, duItems );

                command.CommandText = registrationStrengthChange;
                NpgsqlParameter parameterDateSTFrom = new NpgsqlParameter();
                {
                    #region SQL Parameter
                    parameterDateSTFrom.ParameterName = ":parameterDateSTFrom";
                    parameterDateSTFrom.Direction     = System.Data.ParameterDirection.Input;
                    parameterDateSTFrom.DbType        = System.Data.DbType.Date;
                    parameterDateSTFrom.Value         = dateFrom;
                    #endregion
                }
                NpgsqlParameter parameterDateSTBefore = new NpgsqlParameter();
                {
                    #region SQL Parameter
                    parameterDateSTBefore.ParameterName = ":parameterDateSTBefore";
                    parameterDateSTBefore.Direction     = System.Data.ParameterDirection.Input;
                    parameterDateSTBefore.DbType        = System.Data.DbType.Date;
                    parameterDateSTBefore.Value         = dateBefore;
                    #endregion
                }
                command.Parameters.Add( parameterDateSTFrom );
                command.Parameters.Add( parameterDateSTBefore );

                NpgsqlDataReader reader = command.ExecuteReader();

                List<TemplateForJsonResponse> list = new List<TemplateForJsonResponse>();
                int numberStepByStep = 1;
                while ( reader.Read() )
                {
                    TemplateForJsonResponse template = new TemplateForJsonResponse();

                    template.NumberStepByStep       = numberStepByStep++;
                    template.RegAddres              = reader.GetValue( 4 ).ToString();
                    template.RegulatoryOrganization = reader.GetValue( 1 ).ToString();
                    template.RegDate                = reader.GetValue( 2 ).ToString();
                    template.DateRegOut             = reader.GetValue( 3 ).ToString();

                    list.Add( template );
                }
                reader.Close();
                conn.Close();
                return list;
        }
            catch ( Exception ex )
            {
                List<TemplateForJsonResponse> list = new List<TemplateForJsonResponse>();
                list.Add( new TemplateForJsonResponse { RegAddres = "Ошибка базы данных" + ex.Message.ToString() } );
                return list;
            }
        }
        /// <summary>
        ////Возвращает список адресов по которым была регистрация.
        /// </summary>
        /// <param name="dateFrom">Дата с.</param>
        /// <param name="dateBefore">Дата по.</param>
        /// <param name="duItems">Список du_id по которым будет поиск.</param>
        /// <returns>List<TemplateForJsonResponse></returns>
        public static List<TemplateForJsonResponse> GetStrengthChangeDropOutReport( string dateFrom, string dateBefore, string duItems )
        {
            try
            {
                NpgsqlConnection conn = new NpgsqlConnection( Server=***.***.***.***;Port=***;User Id=***;Password=***;Database=***; );
                conn.Open();
                NpgsqlCommand command = conn.CreateCommand();
                string find = @"%parameterDU%";
                string dropOutStrengthChange = Regex.Replace( Resources.ResourceQuery.drop_out_strength_change, find, duItems );
                command.CommandText = dropOutStrengthChange;

                NpgsqlParameter parameterDateFNFrom = new NpgsqlParameter();
                {
                    #region SQL Parameter
                    parameterDateFNFrom.ParameterName = ":parameterDateFNFrom";
                    parameterDateFNFrom.Direction     = System.Data.ParameterDirection.Input;
                    parameterDateFNFrom.DbType        = System.Data.DbType.Date;
                    parameterDateFNFrom.Value         = dateFrom;
                    #endregion
                }
                NpgsqlParameter parameterDateFNBefore = new NpgsqlParameter();
                {
                    #region SQL Parameter
                    parameterDateFNBefore.ParameterName = ":parameterDateFNBefore";
                    parameterDateFNBefore.Direction     = System.Data.ParameterDirection.Input;
                    parameterDateFNBefore.DbType        = System.Data.DbType.Date;
                    parameterDateFNBefore.Value         = dateBefore;
                    #endregion
                }
                command.Parameters.Add( parameterDateFNFrom   );
                command.Parameters.Add( parameterDateFNBefore );

                NpgsqlDataReader reader = command.ExecuteReader();

                List<TemplateForJsonResponse> list = new List<TemplateForJsonResponse>();
                int numberStepByStep = 1;
                while ( reader.Read() )
                {
                    TemplateForJsonResponse template = new TemplateForJsonResponse();

                    template.NumberStepByStep       = numberStepByStep++;
                    template.RegAddres              = reader.GetValue( 4 ).ToString();
                    template.RegulatoryOrganization = reader.GetValue( 1 ).ToString();
                    template.RegDate                = reader.GetValue( 2 ).ToString();
                    template.DateRegOut             = reader.GetValue( 3 ).ToString();

                    list.Add( template );
                }
                reader.Close();
                conn.Close();
                return list;
            }
            catch ( Exception ex )
            {
                List<TemplateForJsonResponse> list = new List<TemplateForJsonResponse>();
                list.Add( new TemplateForJsonResponse { RegAddres = "Ошибка базы данных" + ex.Message.ToString() } );
                return list;
            }
        }

        /// <summary>
        /// Записывает данные отчёта в XLS документ.
        /// </summary>
        /// <returns>При успешном формировании - true, иначе false.</returns>
        public static bool StrengChangeToExcel() {

            try
            {
                string[,] query1 = ListTransformer.ListToArrayForStrengthChange( Storage.StorageItemsStrengthChangeRegistration );
                string[,] query2 = ListTransformer.ListToArrayForStrengthChange( Storage.StorageItemsStrengthChangeDropOut      );

                string path = AppDomain.CurrentDomain.BaseDirectory + "Areas\\PSP\\Reports\\ReportStrengthChange.xlsx";
                var workbook = new XLWorkbook();
                var worksheet1 = workbook.Worksheets.Add( "Зарегистрированные"   );
                var worksheet2 = workbook.Worksheets.Add( "Снятые с регистрации" );

                var first1 = worksheet1.FirstRow();
                first1.Style.Font.SetBold();

                var first2 = worksheet2.FirstRow();
                first2.Style.Font.SetBold();

                for ( int i = 0; i < query1.GetLength(0); i++ )
                {
                    for ( int j = 0; j < query1.GetLength(1); j++ )
                    {
                        worksheet1.Cell( i + 1, j + 1 ).Value = query1[i, j];
                    }
                }

                for ( int i = 0; i < query2.GetLength(0); i++ )
                {
                    for ( int j = 0; j < query2.GetLength(1); j++ )
                    {
                        worksheet2.Cell( i + 1, j + 1 ).Value = query2[i, j];
                    }
                }
                workbook.SaveAs( path );
                return true;
            }
            catch ( Exception )
            {
                return false;
            }

        }
    }
}