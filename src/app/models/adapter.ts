import { Injectable } from '@angular/core';

export interface Adapter<Type> {
  adapt(item): Type;
}
