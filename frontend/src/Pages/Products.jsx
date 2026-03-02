import React, { useEffect, useState } from 'react';
import NewProductForm from '../Components/NewProductForm';
import ProductsTable from '../Components/ProductsTable';
import ErrorBox from '../Components/ErrorBox';
import useNotification from '../hooks/useNotification';
import { API_URL } from '../config';
import HeaderTitle from '../Components/HeaderTitle';

export default function Products() {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);

  const toast = useNotification();

  const fetchData = () => {
    setPending(true);
    fetch(`${API_URL}/api/products/`)
      .then((res) => res.json())
      .then((res) => {
        res.map((p) => (p.key = p.id));

        setData(res);
        setTimeout(() => {
          setPending(false);
        }, 500);
      })
      .catch((err) => {
        setPending(false);
        setData([]);
        toast.createNotification('error', 'There was an error getting the products', err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <HeaderTitle msg="Add New Product" />
      <NewProductForm updateTable={fetchData} />
      {!data.length && <ErrorBox message={'No fucking product'} />}
      <ProductsTable data={data} pending={pending} updateTable={fetchData} />
    </section>
  );
}
