/**
 * @author : Sajeewa Dilshan <sajeewa@ijse.lk>
 * @since : 11/26/20
**/

import searchOrders from './search-orders.component.html';
import style from './search-orders.component.scss';
import 'admin-lte/plugins/datatables/jquery.dataTables.min';
import 'admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min';
import 'admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min';
import 'admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min';
import { Item } from '../model/items';
import { deleteOrder, getOrderDetails } from '../service/search.order.service';

let dataTable3:any=null;
let items: Array<Item>=[];


$("app-search-orders").replaceWith('<div id="search-orders">' + searchOrders + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);

 $("#tbl-place-orders tbody").on('click','tr .fas',async (event:Event)=>{
    $(event.target as any).parents("tr").remove();
    let id = ($(event.target as any).parents("tr").find("td:first-child").text());


}); 




$("#btn-search-order").on('click',function(){

    $("#txt-cusId-so").val("");
    $("#txt-date").val("");
    $("#txt-totalPrice-so").val("");
     

  
    let ordId=<string>$('#txt-orderId').val();
    
 
 
    if(!ordId.match(/^OD\d{3}$/) ){
        alert("Invalid item inputs");
        return;
    }

    console.log("ordered qty");
    loadOrderDetails(ordId)
    
  
});


 async function loadOrderDetails(ordId:string){

    if(dataTable3){
         ($("#tbl-search-orders") as any).DataTable().destroy();
        $("#tbl-search-orders tbody tr").remove();
        
     }

   


     let itemDetails:any=await getOrderDetails(ordId);
     console.log(itemDetails);

     if(itemDetails=="Enter a valid order Id"){
         alert("Enter a valid order Id");
         return

     }

    let cusId:any=itemDetails.cusId;
     let itemCode:any=itemDetails.itemCode;
     let des:any=itemDetails.des
     let qty:any=itemDetails.qty;
     let unitPrice:any=itemDetails.unitPrice;
     let totalPrice:any=itemDetails.totalPrice;
     let date:any=itemDetails.date;
   
    let totalBill: any=0;

    console.log(unitPrice);

  
    $("#txt-cusId-so").val(cusId);
     $("#txt-date").val(date);
     $("#txt-totalPrice-so").val(totalPrice);

     for (let i =0; i<itemCode.length;i++){

        $('#tbl-search-orders tbody').append(`<tr>
        <td>${itemCode[i]}</td>
        <td>${des[i]}</td>
        <td>${qty[i]}</td>
        <td>${unitPrice[i]}</td>
       
        <td>${unitPrice[i]*qty[i]}</i></td>
        
        </tr>`);
     }
    
    

     dataTable3=($("#tbl-search-orders") as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 5,
        "ordering":false,
        "retrieve": true,
    "paging": false
    });

   

    

    console.log("length", $('#tbl-place-orders tbody').children().length); 

    for(let i=0; i< $('#tbl-place-orders tbody').children().length;i++ ){
        // total += Number.parseFloat($($($('tbody').find('tr')[i]).children()[4]).text());
        totalBill = totalBill+ parseFloat($($($('#tbl-place-orders tbody').find('tr')[i]).children()[4]).text());
         }

     $("#txt-totalPrice").val(totalBill);
     
}



$('#btn-delete-order').on('click',async()=>{
    let ordId=<string>$('#txt-orderId').val();
    
 
 
    if(!ordId.match(/^OD\d{3}$/) ){
        alert("Invalid item inputs");
        return;
    }


   let ans:any= await deleteOrder(ordId);
    if(ans=="deleted"){
        alert("deleted");
    }else if("unsuccess"){
        alert("please enter valid order id");
    }
})