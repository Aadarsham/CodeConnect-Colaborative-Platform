"use client";
import {
  Typography,
  Avatar,
  Grid,
  Container,
  ListItemAvatar,
  Card,
  Box,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import PageTitleWrapper from "@/components/Home/pageTitleWrapper";
import { useAppSelector } from "@/reducers/hook";
import React from "react";
import { useRouter } from "next/navigation";
import {
  get_answer_api,
  get_questions_api,
  teacher_dashboard_api,
} from "@/api";
// import { Chart } from "@/mui/components/Chart";
import Chart from "react-apexcharts";

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    background: ${
      theme.palette.mode === "dark"
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
  `
);
function PageHeader() {
  const user = useAppSelector((state) => state.userReducer.value);
  const theme = useTheme();
  const route = useRouter();
  const [data, setData] = React.useState<any>();

  React.useEffect(() => {
    get_answer_api().then((data) => {
      setData(data.data.data);
    });
  }, []);
  if (user.role !== "") {
    if (user.role == "Student") {
      console.log("YOUR Student conform");
    } else {
      route.push("/dash-board/Student");
    }
  }
  console.log(data);

  return (
    <>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Answer
            </Typography>
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Ans</TableCell>
                      <TableCell>Id</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Comment</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data &&
                      data.map((v: any) => (
                        <TableRow
                          hover
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          <TableCell>{v.ans}</TableCell>
                          <TableCell>{v.id}</TableCell>
                          <TableCell>{v.states}</TableCell>
                          <TableCell>{v.comment}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
            {/* <RecentOrders /> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default PageHeader;
