"use client";
import { Order} from "@prisma/client";
import { formatPrice } from "@/lib/formatPrice";
import React, { useCallback } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Heading from "../../../components/Heading";


import { useRouter } from "next/navigation";
import moment from "moment";

interface OrdersClientProps {
  orders: ExtendedOrder[] ;
}
type ExtendedOrder = Order// & {
  //user: User;
//};
const OrdersClient: React.FC<OrdersClientProps> = ({ orders }) => {
  const Router = useRouter();

  let rows: any = [];
  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,        
        amount: formatPrice(order.amount),     
        date: moment(order.createdDate).fromNow(),
        status: order.status,
         deliveryStatus: order.deliveryStatus,
         products:JSON.stringify(order.products)
         
      };
    });
    console.log(rows);
  }
  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 220 },
    { field: "date", headerName: "Date", width: 100 },
    {
      field: "amount",
      headerName: "Total(FCFA)",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="font-bold text-blue-900">{params.row.amount}</div>
        );
      },
    },

    {
      field: "status",
      headerName: "Statut du paiement",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="text-blue-900">
            {params.row.deliveryStatus}
          </div>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Statut en cours",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="text-blue-900">
            {params.row.deliveryStatus}
          </div>
        );
      },
    },
    {
      field: "products",
      headerName: "liste de produits",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="text-gray-500">
            {params.row.products}
          </div>
        );
      },
    },

    
   
    
  ];

  return (
    <div>
      <div className="flex justify-center items-center min-h-[50px] text-blue-900 text-2xl font-bold">
        <p> Historique de vos commandes</p>
     
      </div>

      <div className="min-h-[300px] w-[400px] sm:w-[600px] lg:w-[900PX]">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default OrdersClient;
