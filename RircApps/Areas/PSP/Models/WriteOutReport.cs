using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Npgsql;
using System.Resources;

namespace RircApps.Areas.PSP.Models
{
    /// <summary>
    /// Класс для отчёта WriteOut - Все выписанные за период.
    /// </summary>
    public static class WriteOutReport
    {
        /// <summary>
        /// Возвращается список типа TemplateForJsonResponse.
        /// </summary>
        /// <param name="dateFrom">Период от.</param>
        /// <param name="dateBefore">Период до.</param>
        /// <returns></returns>
        public static List<TemplateForJsonResponse> GetWriteOutReport( string dateFrom, string dateBefore )
        {
            try
            {
                NpgsqlConnection conn = new NpgsqlConnection( Server=***.***.***.***;Port=***;User Id=***;Password=***;Database=***; );
                conn.Open();
                NpgsqlCommand command = conn.CreateCommand();
                command.CommandText = Resources.ResourceQuery.write_out_report;
                NpgsqlParameter parameterDateFrom = new NpgsqlParameter();
                {
                    #region SQL Parameter
                    parameterDateFrom.ParameterName = ":parameterDateFrom";
                    parameterDateFrom.Direction     = System.Data.ParameterDirection.Input;
                    parameterDateFrom.DbType        = System.Data.DbType.Date;
                    parameterDateFrom.Value         = dateFrom;
                    #endregion
                }
                NpgsqlParameter parameterDateBefore = new NpgsqlParameter();
                {
                    #region SQL Parameter
                    parameterDateBefore.ParameterName = ":parameterDateBefore";
                    parameterDateBefore.Direction     = System.Data.ParameterDirection.Input;
                    parameterDateBefore.DbType        = System.Data.DbType.Date;
                    parameterDateBefore.Value         = dateBefore;
                    #endregion
                }
                command.Parameters.Add( parameterDateFrom   );
                command.Parameters.Add( parameterDateBefore );

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
                    template.RegulatoryOrganization = reader.GetValue( 8 ).ToString();

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