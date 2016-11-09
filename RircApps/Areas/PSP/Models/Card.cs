using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Npgsql;

namespace RircApps.Areas.PSP.Models
{
    /// <summary>
    ////Класс для работы с карточками в ПСП.
    /// </summary>
    public class Card
    {
        /// <summary>
        /// Возвращает список лиц, прикрепленных к карточке в ПСП.
        /// </summary>
        /// <param name="cardId">Номер карточки в псп.</param>
        /// <returns>Возвращает перечисление лиц прикрепленных к карточке.</returns>
        public List<string[]> GetPersonList( string cardId )
        {
            try
            {
                NpgsqlConnection conn = new NpgsqlConnection(Server=***.***.***.***;Port=***;User Id=***;Password=***;Database=***;);
                conn.Open();
                NpgsqlCommand command = conn.CreateCommand();
                command.CommandText = Resources.ResourceQuery.kart_info;

                command.Parameters.Add( ":p_kart_id", NpgsqlTypes.NpgsqlDbType.Integer ).Value = Convert.ToInt32( cardId );

                NpgsqlDataReader reader = command.ExecuteReader();

                List<string[]> personList = new List<string[]>();

                while ( reader.Read() )
                {
                    string[] persons = new string[4];
                    persons[0] = reader.GetValue( 0 ).ToString();
                    persons[1] = reader.GetValue( 1 ).ToString();
                    persons[2] = reader.GetValue( 2 ).ToString();
                    persons[3] = reader.GetValue( 3 ).ToString();

                    personList.Add( persons );             
                }
                reader.Close();
                conn.Close();
                return personList;
            }
            catch ( Exception ex )
            {
                List<string[]> personList = new List<string[]>();
                personList.Add( new string[4] { " ","Ошибка базы данных", " ", ex.Message.ToString() } );
                return personList;
            }
        }
        /// <summary>
        ////Удаляет карточку.
        /// </summary>
        /// <param name="cardId">Идентификатор карточки.</param>
        public void Del( string cardId )
        {
            NpgsqlConnection conn = new NpgsqlConnection( Server=***.***.***.***;Port=***;User Id=***;Password=***;Database=***; );
            conn.Open();
            NpgsqlCommand command = conn.CreateCommand();
            command.CommandText = Resources.ResourceQuery.kart_del;

            command.Parameters.Add( ":p_kart_id", NpgsqlTypes.NpgsqlDbType.Integer ).Value = Convert.ToInt32( cardId );

            command.ExecuteReader();

            conn.Close();
        }

        /// <summary>
        /// Отображает информацию о квартире по номеру карточки.
        /// </summary>
        /// <param name="personId">Карточка №.</param>
        /// <returns></returns>
        public string[] GetFlatInfo( string cardId ) {
            try
            {
                NpgsqlConnection conn = new NpgsqlConnection( Server=***.***.***.***;Port=***;User Id=***;Password=***;Database=***; );
                conn.Open();
                NpgsqlCommand command = conn.CreateCommand();
                command.CommandText = Resources.ResourceQuery.flat_info;

                command.Parameters.Add( ":p_kart_id", NpgsqlTypes.NpgsqlDbType.Integer ).Value = Convert.ToInt32( cardId );

                NpgsqlDataReader reader = command.ExecuteReader();

                string[] flatInfo = new string[3];

                while ( reader.Read() )
                {
                    flatInfo[0] = reader.GetValue( 0 ).ToString();
                    flatInfo[1] = reader.GetValue( 1 ).ToString();
                    flatInfo[2] = reader.GetValue( 2 ).ToString();
                }
                reader.Close();
                conn.Close();
                return flatInfo;
            }
            catch ( Exception ex )
            {
                return new string[3] { " ","Ошибка базы данных", ex.Message.ToString() };
            }
        }

        /// <summary>
        /// Изменяет номер помещения.
        /// </summary>
        /// <param name="cardId">Номер карточки.</param>
        /// <param name="newFlat">Новый номер помещения.</param>
        public void ChangeFlat( string cardId, string newFlat )
        {
            NpgsqlConnection conn = new NpgsqlConnection( Server=***.***.***.***;Port=***;User Id=***;Password=***;Database=***; );
            conn.Open();
            NpgsqlCommand command = conn.CreateCommand();
            command.CommandText = Resources.ResourceQuery.flat_change;

            command.Parameters.Add( ":p_ls_flat", NpgsqlTypes.NpgsqlDbType.Text    ).Value = newFlat;
            command.Parameters.Add( ":p_kart_id", NpgsqlTypes.NpgsqlDbType.Integer ).Value = Convert.ToInt32( cardId );

            command.ExecuteReader();

            conn.Close();
        }
    }
}