import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/system';
import { Link } from "react-router-dom";

const BookContainer = styled(Container)(({theme}) => ({
    cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	bookTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	bookText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},

}));

const Books = (props) => {
	const { books } = props;
	console.log(books)
	if (!books || books.length === 0) return <p>Can not find any books, sorry</p>;
	return (
	
			<BookContainer maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{books.map((book) => {
						return (
							<Grid item key={book.id} xs={12} md={4}>
								<Card sx={{ width: '100%', height: '100%' }}>
                                    <Link  to={`/books/book/${book.id}`} >
									<CardMedia
										sx={{ paddingTop: '56.25%', height: 0}}
										image={book.image_url}
										title="Image title"
									/>
                                    </Link>
									<CardContent sx={{ height: '150px' }}>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											sx={{ fontSize: '16px', textAlign: 'left'}}
										>
											<strong>{book.title.substr(0, 25)}...</strong>
											<br/>
                                            {book.author} - {book.year_published}
										</Typography>
										<div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            fontSize: '12px',
                                            textAlign: 'right',
                                            marginBottom: '6px',
                                        }}
                                        >
											<Typography component="p" color="textPrimary"></Typography>
											<Typography variant="p" color="textSecondary">
												<br/>
												<i>{book.genre}</i>
											</Typography>
										</div>
									</CardContent>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</BookContainer>
	);
};
export default Books;