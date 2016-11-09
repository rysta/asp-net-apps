using System;
using System.Collections.Generic;
using Npgsql;

namespace RircApps.Areas.PSP.Models
{
    /// <summary>
    /// Класс для работы с людьми в ПСП.
    /// </summary>
    public class Person
    {
        // По идентификатору человека получает информацию о его номере из БД и ФИО.
        public string[] GetInfo( string personId ) {
            try
            {
                NpgsqlConnection conn = new NpgsqlConnection( Server=***.***.***.***;Port=***;User Id=***;Password=***;Database=***; );
                conn.Open();
                NpgsqlCommand command = conn.CreateCommand();
                command.CommandText = Resources.ResourceQuery.person_info;

                command.Parameters.Add( ":p_chel", NpgsqlTypes.NpgsqlDbType.Integer ).Value = Convert.ToInt32( personId );

                NpgsqlDataReader reader = command.ExecuteReader();

                string[] personInfo = new string[2];

                while ( reader.Read() )
                {
                    personInfo[0] = reader.GetValue( 0 ).ToString();
                    personInfo[1] = reader.GetValue( 1 ).ToString();
                }
                reader.Close();
                conn.Close();
                return personInfo;
            }
            catch ( Exception ex )
            {
                return new string[2] { "Ошибка базы данных", ex.Message.ToString() };
            }
        }

        /// <summary>
        /// Удаляет человека из карточки.
        /// </summary>
        /// <param name="personId">Человек №.</param>
        public void Del( string personId )
        {
            NpgsqlConnection conn = new NpgsqlConnection( Server=***.***.***.***;Port=***;User Id=***;Password=***;Database=***; );
            conn.Open();
            NpgsqlCommand command = conn.CreateCommand();
            command.CommandText = Resources.ResourceQuery.person_del;

            command.Parameters.Add( ":p_chel", NpgsqlTypes.NpgsqlDbType.Integer ).Value = Convert.ToInt32( personId );

            command.ExecuteReader();

            conn.Close();
        }
    }
}