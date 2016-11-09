using System.Web.Mvc;

namespace RircApps.Areas.PSP
{
    public class PSPAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "PSP";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "PSP_default",
                "PSP/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}