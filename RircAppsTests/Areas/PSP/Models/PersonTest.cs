using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Diagnostics;
using RircApps.Areas.PSP.Models;

namespace RircAppsTests
{
    [TestClass]
    public class PersonTest
    {
        [TestMethod]
        public void GetInfo_PersonId_FIO()
        {
            // Arrange.
            Person person = new Person();
            string [] expect = new string[] { "923443", "Абрамова Ольга Владимировна" };

            // Act.
            string[] actual = person.GetInfo("923443");


            // Assert.
            Debug.Write("PersonID = " + actual[0].ToString() + " " + "FIO = " + actual[1].ToString());
            Assert.AreEqual(expect[0], actual[0]);
            Assert.AreEqual(expect[1], actual[1]);

        }
        [TestMethod]
        public void GetInfo_IncorrectPersonId_FIO()
        {
            // Arrange.
            Person person = new Person();

            // Act.
            string[] actual = person.GetInfo("9999");


            // Assert.
           // Debug.Write("PersonID = " + actual[0].ToString() + " " + "FIO = " + actual[1].ToString());

            Assert.IsNull(actual[0]);
            Assert.IsNull(actual[1]);

        }
    }
}
