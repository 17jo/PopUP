using Microsoft.AspNetCore.Mvc;
using Maj2021.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;

namespace Maj2021.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientController:ControllerBase
    {
        public Context Context;
        public ClientController(Context context)
        {
            Context=context;
        }

        [Route("Login/{username}/{password}")]
        [HttpGet]
        public async Task<ActionResult> Login(string username, string password)
        {
            Client findClient = Context.Client.Where(p=> p.UserName==username && p.Password==password).FirstOrDefault();
            if(findClient==null) return Ok(false);
            else return Ok(true);
        }
    
        [Route("AddUser/{username}/{password}")]
        [HttpPost]
        public async Task<ActionResult> AddUser(string username, string password)
        {
           Client c = new Client();
           c.UserName = username;
           c.Password = password;
            try
            {
                Context.Client.Add(c);
                await Context.SaveChangesAsync();
                return Ok(c);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("AddClientInfo/{id}/{name}/{surname}/{age}")]
        [HttpPost]
        public async Task<ActionResult> AddClientInfo(int id, string name,string surname,int age)
        {
           Client cli = Context.Client.Where(m=> m.ID==id).FirstOrDefault();
            if(cli==null) return BadRequest("Client doesnt exist!");
            cli.Name = name;
            cli.SurName=surname;
            cli.Age = age;
            try
            {
                Context.Client.Update(cli);
                await Context.SaveChangesAsync();
                return Ok(cli);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

