// src/components/Header.js
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import Logo from "../Logo";

export default function Header() {
    const { user } = useAuth();

    return (
        <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0 }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  <Logo />
                </Typography>
                <nav>
                    <Grid container spacing={2}>
                        <Grid item>
                            <NavLink
                                to="/"
                                style={({ isActive }) => ({
                                    color: isActive ? 'cyan' : 'inherit',
                                    textDecoration: 'none',
                                })}
                            >
                                Home
                            </NavLink>
                        </Grid>
                        {user ? (
                            <>
                                <Grid item>
                                    <NavLink
                                        to={`${user.displayName}/dashboard`}
                                        style={({ isActive }) => ({
                                            color: isActive ? 'cyan' : 'inherit',
                                            textDecoration: 'none',
                                        })}
                                    >
                                        Dashboard
                                    </NavLink>
                                </Grid>
                                <Grid item>
                                    <NavLink
                                        to={`${user.displayName}/pantries`}
                                        style={({ isActive }) => ({
                                            color: isActive ? 'cyan' : 'inherit',
                                            textDecoration: 'none',
                                        })}
                                    >
                                        Pantries
                                    </NavLink>
                                </Grid>
                                <Grid item>
                                    <NavLink
                                        to={`${user.displayName}/profile`}
                                        style={({ isActive }) => ({
                                            color: isActive ? 'cyan' : 'inherit',
                                            textDecoration: 'none',
                                        })}
                                    >
                                        Profile
                                    </NavLink>
                                </Grid>
                                <Grid item>
                                    <NavLink
                                        to="signout"
                                        style={({ isActive }) => ({
                                            color: isActive ? 'cyan' : 'inherit',
                                            textDecoration: 'none',
                                        })}
                                    >
                                        Sign Out
                                    </NavLink>
                                </Grid>
                            </>
                        ) : (
                            <Grid item>
                                <NavLink
                                    to="login"
                                    style={({ isActive }) => ({
                                        color: isActive ? 'cyan' : 'inherit',
                                        textDecoration: 'none',
                                    })}
                                >
                                    Sign In
                                </NavLink>
                            </Grid>
                        )}
                    </Grid>
                </nav>
            </Toolbar>
        </AppBar>
    );
}
