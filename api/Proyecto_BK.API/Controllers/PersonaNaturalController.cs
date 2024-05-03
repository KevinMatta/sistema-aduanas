using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using sistema_aduana.BusinessLogic.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace sistema_aduana.API.Controllers
{
    [ApiController]
    [Route("/API/[controller]")]
    public class PersonaNaturalController : Controller
    {
        private readonly GralService _gralService;
        private readonly IMapper _mapper;
        public PersonaNaturalController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }
        //[HttpGet("List")]
        //public IActionResult Index()
        //{
        //    var list = _gralService.PersonaNaturalListar();
        //    return Ok(list);
        //}


        //[HttpPost("SubirDNI")]
        //public IActionResult SubirDNI()
        //{
        //    try
        //    {
        //        var pdf = Request.Form.Files[0];
        //        string accessKeyId = "YOUR_ACCESS_KEY_ID";
        //        string secretAccessKey = "YOUR_SECRET_ACCESS_KEY";
        //        string bucketName = "YOUR_BUCKET_NAME";
        //        string keyName = "YOUR_FILE_NAME.pdf"; // Specify the file name for the uploaded PDF

        //        // Create an S3 client
        //        using (var client = new AmazonS3Client(accessKeyId, secretAccessKey, RegionEndpoint.USWest2)) // Change the region accordingly
        //        {
        //            using (var newMemoryStream = new MemoryStream())
        //            {
        //                // Copy the PDF file stream to a memory stream
        //                await pdf.CopyToAsync(newMemoryStream);

        //                // Upload the PDF file to the S3 bucket
        //                var fileTransferUtility = new TransferUtility(client);
        //                await fileTransferUtility.UploadAsync(newMemoryStream, bucketName, keyName);
        //            }
        //        }
        //        return Ok("RTN guardado!");
        //    }
        //    catch (Exception)
        //    {
        //        return BadRequest("Error al guardar el RTN");
        //    }
        //}

        //[HttpPost("SubirRecibo")]
        //public IActionResult SubirRecibo()
        //{
        //    try
        //    {
        //        var pdf = Request.Form.Files[0];
        //        string accessKeyId = "YOUR_ACCESS_KEY_ID";
        //        string secretAccessKey = "YOUR_SECRET_ACCESS_KEY";
        //        string bucketName = "YOUR_BUCKET_NAME";
        //        string keyName = "YOUR_FILE_NAME.pdf"; // Specify the file name for the uploaded PDF

        //        // Create an S3 client
        //        using (var client = new AmazonS3Client(accessKeyId, secretAccessKey, RegionEndpoint.USWest2)) // Change the region accordingly
        //        {
        //            using (var newMemoryStream = new MemoryStream())
        //            {
        //                // Copy the PDF file stream to a memory stream
        //                await pdf.CopyToAsync(newMemoryStream);

        //                // Upload the PDF file to the S3 bucket
        //                var fileTransferUtility = new TransferUtility(client);
        //                await fileTransferUtility.UploadAsync(newMemoryStream, bucketName, keyName);
        //            }
        //        }
        //        return Ok("RTN guardado!");
        //    }
        //    catch (Exception)
        //    {
        //        return BadRequest("Error al guardar el RTN");
        //    }
        //}
    }
}
