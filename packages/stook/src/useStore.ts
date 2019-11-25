import { useState, useEffect, useRef } from 'react'
import { createUseStore } from './createUseStore'

export const useStore = createUseStore(useState, useEffect, useRef)
