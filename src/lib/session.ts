import {SignJWT,jwtVerifiy} from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
const secretKey = 'secret'
const key = new TextEncoder().encode()