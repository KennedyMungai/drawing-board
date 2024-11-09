"use server";

import { signIn, signOut } from "@/auth";

export const githubSigninAction = async () => await signIn("github");

export const googleSigninAction = async () => await signIn("google");

export const signOutAction = async () => await signOut();
