﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CatalogApp.Objects
{
    public class Item
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string ImagePath { get; set; }

        public Item(String name, String description, double price, String imgPath)
        {
            Name = name;
            Description = description;
            Price = price;
            ImagePath = imgPath;
        }

    }
}
