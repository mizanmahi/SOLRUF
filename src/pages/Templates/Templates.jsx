import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";

const Templates = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log(JSON.parse(searchParams.get("products")));

    if (JSON.parse(searchParams.get("products")))
      setProducts(JSON.parse(searchParams.get("products")));
  }, [searchParams]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "8rem" }}>
      <Template1
        products={products}
        invoiceType={JSON.parse(searchParams.get("invoiceType"))}
        invoice={JSON.parse(searchParams.get("invoice"))}
        seller={JSON.parse(searchParams.get("seller"))}
        buyer={JSON.parse(searchParams.get("buyer"))}
        shipping={JSON.parse(searchParams.get("shipping"))}
        bank={JSON.parse(searchParams.get("bank"))}
        tnc={JSON.parse(searchParams.get("tnc"))}
      />
      <Template2
        products={products}
        invoiceType={JSON.parse(searchParams.get("invoiceType"))}
        invoice={JSON.parse(searchParams.get("invoice"))}
        seller={JSON.parse(searchParams.get("seller"))}
        buyer={JSON.parse(searchParams.get("buyer"))}
        shipping={JSON.parse(searchParams.get("shipping"))}
        bank={JSON.parse(searchParams.get("bank"))}
        tnc={JSON.parse(searchParams.get("tnc"))}
      />
      <Template3
        products={products}
        invoiceType={JSON.parse(searchParams.get("invoiceType"))}
        invoice={JSON.parse(searchParams.get("invoice"))}
        seller={JSON.parse(searchParams.get("seller"))}
        buyer={JSON.parse(searchParams.get("buyer"))}
        shipping={JSON.parse(searchParams.get("shipping"))}
        bank={JSON.parse(searchParams.get("bank"))}
        tnc={JSON.parse(searchParams.get("tnc"))}
      />
      <Template4
        products={products}
        invoiceType={JSON.parse(searchParams.get("invoiceType"))}
        invoice={JSON.parse(searchParams.get("invoice"))}
        seller={JSON.parse(searchParams.get("seller"))}
        buyer={JSON.parse(searchParams.get("buyer"))}
        shipping={JSON.parse(searchParams.get("shipping"))}
        bank={JSON.parse(searchParams.get("bank"))}
        tnc={JSON.parse(searchParams.get("tnc"))}
      />
    </Box>
  );
};

export default Templates;
