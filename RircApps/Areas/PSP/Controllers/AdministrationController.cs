using System;
using System.Web.Mvc;
using RircApps.Areas.PSP.Models;

namespace RircApps.Areas.PSP.Controllers
{
    public class AdministrationController : Controller
    {
        // GET: PSP/Administration

        #region DelPerson
        public ActionResult DelPersonRegistrationHtml()
        {
            var delPersonRegistrationHtml = Resources.ResourcePartialHTML.del_person_registration;

            return Json( delPersonRegistrationHtml, JsonRequestBehavior.AllowGet );
        }
        public ActionResult GetPersonInfo( string person )
        {
            Person personInfo  = new Person();

            var personInf = personInfo.GetInfo(person);

            return Json( personInf, JsonRequestBehavior.AllowGet );
        }

        public ActionResult DelPerson( string personId )
        {

            Person person  = new Person();
            try
            {
                person.Del( personId );
                return Json( true, JsonRequestBehavior.AllowGet );
            }
            catch ( Exception )
            {
                return Json( false, JsonRequestBehavior.AllowGet );
            }
        }

        #endregion

        #region DelKard
        public ActionResult DelKartHtml()
        {
            var delKartHtml = Resources.ResourcePartialHTML.del_kart;

            return Json( delKartHtml, JsonRequestBehavior.AllowGet );
        }
        public ActionResult GetKartInfo( string kart_id )
        {
            Card card  = new Card();

            var person_list = card.GetPersonList(kart_id);

            return Json( person_list, JsonRequestBehavior.AllowGet );
        }
        public ActionResult DelCard( string kart_id )
        {
            Card card  = new Card();
            try
            {
                card.Del( kart_id );
                return Json( true, JsonRequestBehavior.AllowGet );
            }
            catch ( Exception )
            {
                return Json( false, JsonRequestBehavior.AllowGet );
            }
        }

        #endregion

        #region ChangeFlat

        public ActionResult ChangeFlatHtml()
        {
            var changeFlatHtml = Resources.ResourcePartialHTML.change_flat;

            return Json( changeFlatHtml, JsonRequestBehavior.AllowGet );
        }

        public ActionResult GetFlatInfo( string kartId )
        {
            Card card  = new Card();

            var flatInfo = card.GetFlatInfo(kartId);

            return Json( flatInfo, JsonRequestBehavior.AllowGet );
        }

        public ActionResult ChangeFlat( string kartId, string newFlat )
        {
            Card card  = new Card();
            try
            {
                card.ChangeFlat( kartId, newFlat );
                return Json( true, JsonRequestBehavior.AllowGet );
            }
            catch ( Exception )
            {
                return Json( false, JsonRequestBehavior.AllowGet );
            }
        }

        #endregion

        #region AddOvd
        public ActionResult AddOvdHtml()
        {
            var addOvdHtml = Resources.ResourcePartialHTML.add_ovd;

            return Json( addOvdHtml, JsonRequestBehavior.AllowGet );
        }

        public ActionResult AddOvd(string ovd)
        {
            try
            {
                Ovd ovdOdj = new Ovd();

                int ovdId = ovdOdj.AddOvd( ovd );

                return Json( ovdId, JsonRequestBehavior.AllowGet );
            }
            catch ( Exception ex )
            {
                string err = "Ошибка БД " + ex.Message;
                return Json( err, JsonRequestBehavior.AllowGet );
            }

        }


        #endregion

    }
}