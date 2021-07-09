import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TheatersIcon from '@material-ui/icons/Theaters';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Meta Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function PlaceHolder(props){
  return (
    <div style={{ padding: "10%"}}>
        <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
          {props.title}
        </Typography>
        <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
          {props.subtitle}
        </Typography>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


export default function LandingPage() {
  const classes = useStyles();
  const [records, setData] = React.useState(null);

  const handleClick = async(name) => {
    let data = await fetch("/api/" + name)
    .then((res) => res.json())
    .then((res) => setData(res));
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <TheatersIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Meta Assignment
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent} style={{height:400, marginTop: 30}}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Welcome!
            </Typography>

            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={e => handleClick("btn1")}>
                    Button 1
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={e => handleClick("btn2")}>
                    Button 2
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={e => handleClick("btn3")}>
                    Button 3
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>


        {!records && <PlaceHolder title="No Information Available!" subtitle = "Press the buttons to load the data!" />}
        {(records && records.Response == "False") && <PlaceHolder title="Results Not Found!" subtitle = "Please try different button! :D" /> }

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={3}>
            {(records && records.Response == "True") && records.Search.map((card) => (
              <Grid item key={card} xs={3} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={"N/A" == card.Poster ? "static/no_image.jpeg": card.Poster }
                    // image = {card.Poster}
                
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h5">
                      {card.Title}
                    </Typography>
                    <Typography>
                      Year: {card.Year}
                    </Typography>
                    <Typography>
                      Type: {card.Type}
                    </Typography>
                    
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        {/* <Typography variant="h6" align="center" gutterBottom>
        {/* Meta Assignment Web Page */}
        {/* </Typography> } */}
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}