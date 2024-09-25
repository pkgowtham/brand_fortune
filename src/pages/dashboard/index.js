import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core';
import { People, ShoppingCart, AssignmentTurnedIn, MonetizationOn } from '@material-ui/icons';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);
//import { fetchCustomersRequest } from '../../../service/customers/action';


const useStyles = makeStyles((theme) => ({
  dashboard: {
    padding: theme.spacing(4),
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  icon: {
    fontSize: 50,
    color: theme.palette.primary.main,
  },
  details: {
    textAlign: 'left',
  },
  title: {
    marginBottom: theme.spacing(1),
    fontSize: 17,
    fontWeight: 500,
  },
  count: {
    fontSize: 24,
    fontWeight: 700,
  },
  chartContainer: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  tableContainer: {
    marginTop: theme.spacing(0),
  },
  statusCell: {
    fontWeight: 700,
    '&.Shipped': {
      color: theme.palette.success.main,
    },
    '&.Processing': {
      color: theme.palette.warning.main,
    },
    '&.Delivered': {
      color: theme.palette.info.main,
    },
    '&.Cancelled': {
      color: theme.palette.error.main,
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [orders, setOrders] = useState([]);


  const filter = useSelector((state) => state.customers?.filter);
  const { data, error, loading } = useSelector(
    (state) => state.customers?.customers
  );


  useEffect(() => {
    // Replace this with your API calls to fetch the actual data
    setTotalProducts(123); // example data
    setTotalCustomers(456); // example data
    setTotalOrders(789); // example data
    setTotalSales(10000); // example data

    // Example orders data
    setOrders([
      { id: '001', product: 'Product A', customer: 'John Doe', date: '2024-08-01', status: 'Shipped' },
      { id: '002', product: 'Product B', customer: 'Jane Smith', date: '2024-08-03', status: 'Processing' },
      { id: '003', product: 'Product C', customer: 'Bob Johnson', date: '2024-08-04', status: 'Delivered' },
      { id: '004', product: 'Product D', customer: 'Alice Brown', date: '2024-08-05', status: 'Cancelled' },
      { id: '005', product: 'Product E', customer: 'Charlie Green', date: '2024-08-06', status: 'Shipped' },
    ]);
  }, []);

  // Sample data for the sales chart
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Current Year',
        data: [1200, 1900, 3000, 5000, 2300, 2100, 3000, 4000, 4500, 3200, 2900, 4000],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
      {
        label: 'Last Year',
        data: [1500, 2000, 2700, 3900, 2100, 2200, 3300, 3700, 4100, 3000, 2800, 3500],
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1,
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Comparison (Current Year vs Last Year)',
      },
    },
  };

 



  return (
    <div className={classes.dashboard}>
      <Grid container spacing={4}>
    
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <People className={classes.icon} />
            <CardContent className={classes.details}>
              <Typography className={classes.title} color="textSecondary">
                Total Customers
              </Typography>
              <Typography className={classes.count} color="textPrimary">
                {totalCustomers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <ShoppingCart className={classes.icon} />
            <CardContent className={classes.details}>
              <Typography className={classes.title} color="textSecondary">
                Total Products
              </Typography>
              <Typography className={classes.count} color="textPrimary">
                {totalProducts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <AssignmentTurnedIn className={classes.icon} />
            <CardContent className={classes.details}>
              <Typography className={classes.title} color="textSecondary">
                Total Orders
              </Typography>
              <Typography className={classes.count} color="textPrimary">
                {totalOrders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <MonetizationOn className={classes.icon} />
            <CardContent className={classes.details}>
              <Typography className={classes.title} color="textSecondary">
                Total Sales
              </Typography>
              <Typography className={classes.count} color="textPrimary">
                Rs.{totalSales}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Card className={classes.chartContainer}>
            <Line data={salesData} options={salesOptions} />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell className={`${classes.statusCell} ${order.status}`}>
                      {order.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
