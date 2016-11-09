using System;
using System.Collections.Generic;
using Npgsql;

namespace RircApps.Areas.PSP.Models
{
    /// <summary>
    /// Класс для отчёта DropOutMilitary - Все выбывшие военнообязанные.
    /// </summary>
    public static class DropOutMilitaryReport
    {
        /// <summary>
        /// Возвращается список типа TemplateForJsonResponse.
        /// </summary>
        /// <param name="dateRDFrom">Дата рождения от.</param>
        /// <param name="dateRDBefore">Дата рождения до.</param>
        /// <param name="dateSTFrom">Период от.</param>
        /// <param name="dateSTBefore">Период до.</param>
        /// <returns></returns>
        public static List<TemplateForJsonResponse> GetDropOutMilitaryReport( string dateRDFrom, string dateRDBefore, string dateSTFrom, string dateSTBefore )
        {
            try
            {
                NpgsqlConnection conn = new NpgsqlConnection( Server=***.***.***.***;Port=***;User Id=***;Password=***;Database=***; );
                conn.Open();
                NpgsqlCommand command = conn.CreateCommand();
                command.CommandText = Resources.ResourceQuery.drop_out_military_report;
                NpgsqlParameter parameterRDDateFrom = new NpgsqlParameter();
                {
                    #region SQL Parameter
                    parameterRDDateFrom.ParameterName = ":parameterRDDateFrom";
                    parameterRDDateFrom.Direction     = System.Data.ParameterDirection.Input;
                    parameterRDDateFrom.DbType        = System.Data.DbType.Date;
                    parameterRDDateFrom.Value         = dateRDFrom;
                    #endregion
                }
                NpgsqlParameter parameterRDDateBefore = new NpgsqlParameter();
                {
                    #region SQL Parameter
                    parameterRDDateBefore.ParameterName = ":parameterRDDateBefore";
                    parameterRDDateBefore.Direction     = System.Data.ParameterDirection.Input;
                    parameterRDDateBefore.DbType        = System.Data.DbType.Date;
                    parameterRDDateBefore.Value         = dateRDBefore;
                    #endregion
                }
                NpgsqlParameter parameterDateFrom = new NpgsqlParameter();
                {
                    #region SQL Parameter
                    parameterDateFrom.ParameterName = ":parameterDateFrom";
                    parameterDateFrom.Direction     = System.Data.ParameterDirection.Input;
                    parameterDateFrom.DbType        = System.Data.DbType.Date;
                    parameterDateFrom.Value         = dateSTFrom;
                    #endregion
                }
                NpgsqlParameter parameterDateBefore = new NpgsqlParameter();
                {
                    #region SQL Parameter
                    parameterDateBefore.ParameterName = ":parameterDateBefore";
                    parameterDateBefore.Direction     = System.Data.ParameterDirection.Input;
                    parameterDateBefore.DbType        = System.Data.DbType.Date;
                    parameterDateBefore.Value         = dateSTBefore;
                    #endregion
                }
                command.Parameters.Add( parameterRDDateFrom   );
                command.Parameters.Add( parameterRDDateBefore );
                command.Parameters.Add( parameterDateFrom     );
                command.Parameters.Add( parameterDateBefore   );

                NpgsqlDataReader reader = command.ExecuteReader();
                List<TemplateForJsonResponse> list = new List<TemplateForJsonResponse>();
                int numberStepByStep = 1;
                while ( reader.Read() )
                {
                    TemplateForJsonResponse template = new TemplateForJsonResponse();

                    template.NumberPRU              = Convert.ToInt32( reader.GetValue( 0 ) );
                    template.NumberStepByStep       = numberStepByStep++;
                    template.FIO                    = reader.GetValue( 1 ).ToString();
                    template.DateOfBirth            = reader.GetValue( 2 ).ToString();
                    template.RegAddres              = reader.GetValue( 3 ).ToString();
                    template.DateRegOut             = reader.GetValue( 4 ).ToString();
                    template.WhichSent              = reader.GetValue( 5 ).ToString();
                    template.RegType                = reader.GetValue( 6 ).ToString();
                    template.DateOfDeath            = reader.GetValue( 7 ).ToString();
                    template.PassportWhoGive        = reader.GetValue( 8 ).ToString();
                    template.RegulatoryOrganization = reader.GetValue( 9 ).ToString();

                    list.Add( template );
                }
                reader.Close();
                conn.Close();
                return list;
            }
            catch ( Exception ex )
            {
                List<TemplateForJsonResponse> list = new List<TemplateForJsonResponse>();
                list.Add( new TemplateForJsonResponse { RegAddres = "Ошибка базы данных", RegType = ex.Message.ToString() } );
                return list;
            }
        }

    }
}