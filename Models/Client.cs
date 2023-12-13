using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Maj2021.Models
{
    [Table("Client")]
    public class Client
    {
        [Key]
        public int ID {get; set; }
        public string Name {get; set; }

        public string SurName {get; set; }

        public int Age {get; set; }

        public string UserName {get; set; }

        public string Password {get; set; }



    }
}