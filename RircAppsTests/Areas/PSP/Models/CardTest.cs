using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RircApps.Areas.PSP.Models;

namespace RircAppsTests.Areas.PSP.Models
{
    [TestClass]
    public class CardTest
    {
        [TestMethod]
        public void GetPersonList_CardId_PersonList()
        {
            // Arrange.
            Card card = new Card();

            // Act.
            var personList = card.GetPersonList("200");

            // Assert.
            Assert.IsTrue(personList.Count > 0);
        }

        [TestMethod]
        public void GetPersonList_IncorrectCardId_PersonList()
        {
            // Arrange.
            Card card = new Card();

            // Act.
            var personList = card.GetPersonList("9999");

            // Assert.
            Assert.IsTrue(personList.Count == 0);
        }

        [TestMethod]
        public void GetFlatInfo_CardIdId_FIO()
        {
            // Arrange.
            Card card = new Card();
            string [] expect = new string[] { "200", "ул. Литейная дом 61", "147" };

            // Act.
            string[] actual = card.GetFlatInfo("200");


            // Assert.
            Assert.AreEqual(expect[0], actual[0]);
            Assert.AreEqual(expect[1], actual[1]);
            Assert.AreEqual(expect[2], actual[2]);
        }
    }
}
