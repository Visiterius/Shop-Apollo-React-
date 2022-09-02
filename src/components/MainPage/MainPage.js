import React from "react";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import {InMemoryCache} from "@apollo/client";
import Category from "../Category/Category";
import './MainPage.css'


const GET_LOCATIONS = gql`
    {
        categories{
            products{
                name
                id
                category
                description
                gallery
                inStock
                prices{
                    amount
                    currency{
                        symbol
                    }
                }
                attributes{
                    id
                    items{
                        value
                    }
                }
            }
        }
    }
`;

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

class MainPage extends React.Component{
    render() {
        return(
            <ApolloProvider client={client}>
                <Query query={GET_LOCATIONS} >
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading…</p>;
                        if (error) return <p>Error :(</p>;
                        return (
                            <div className='Main'>
                                <Category data={data}/>
                            </div>
                        );
                    }}
                </Query>
            </ApolloProvider>
        )
    }
}
export default MainPage