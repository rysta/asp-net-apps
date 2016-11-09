using Npgsql;

namespace RircApps.Areas.PSP.Models
{
    /// <summary>
    /// Класс для работы с таблицей Ovd в ПСП
    /// </summary>
    public class Ovd
    {
        /// <summary>
        /// Добавляет новую запись "кем выдан".
        /// </summary>
        /// <param name="ovd">Новая запись "кем выдан".</param>
        /// <returns>Идентификатор новой записи.</returns>
        public int AddOvd( string ovd ) {

            NpgsqlConnection conn = new NpgsqlConnection( Server=***.***.***.***;Port=***;User Id=***;Password=***;Database=***; );
            conn.Open();
            NpgsqlCommand command = conn.CreateCommand();

            command.CommandText = "psp.insert_ovd";
            command.CommandType = System.Data.CommandType.StoredProcedure;

            command.Parameters.Add( "p_ovd_name", NpgsqlTypes.NpgsqlDbType.Varchar ).Value = ovd;

            int ovdId = ( int ) command.ExecuteScalar();

            return ovdId;
        }

    }
}