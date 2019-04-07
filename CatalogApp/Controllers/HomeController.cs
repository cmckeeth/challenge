using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CatalogApp.Models;
using CatalogApp.Objects;
using Newtonsoft.Json;

namespace CatalogApp.Controllers
{
    public class HomeController : Controller
    {
        private static List<Item> Items = new List<Item>();

        public IActionResult Index()
        {
            return View();
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }



        [HttpPost]
        [Route("removeItem")]
        public ActionResult RemoveItem([FromBody] Item item)
        {
            if (!itemExists(item))
            {
                return new BadRequestResult();
            }
            else
            {
                return RemoveItemFromMemory(item);
            }
        }
        public ActionResult RemoveItemFromMemory(Item item)
        {
            var temp = Items.Count();

            foreach (Item x in Items)
            {
                if (x.Name == item.Name)
                {
                    Items.Remove(x);
                }
                if (Items.Count() == 0) { break; }
            }
            if (Items.Count() == temp - 1)
            {
                return new OkResult();
            }
            else return new UnprocessableEntityResult();
        }


        [HttpPost]
        [Route("addItem")]
        public ActionResult AddItem([FromBody] Item item)
        {
            if (item.Name == null || item.Price == 0 || item.ImagePath == null)
            {
                return new BadRequestResult();
            }
            return AddItemToMemory(item);
        }
        public ActionResult AddItemToMemory(Item item)
        {
            var temp = Items.Count();
            Items.Add(item);
            if (Items.Count() == temp + 1)
            {
                return new OkResult();
            }
            else return new UnprocessableEntityResult();
        }


        [HttpGet]
        [Route("getItems")]
        public String GetItems()
        {
            return JsonConvert.SerializeObject(Items);
        }


        /// <summary>
        /// Helper method to tell whether item exists in memory
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public bool itemExists(Item item)
        {
            foreach (Item i in Items)
            {
                if (i.Name == item.Name)
                    return true;                
            }
            return false;
        }





    }
}
