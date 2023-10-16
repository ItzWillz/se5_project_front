<template>
    <v-container>
      <v-card>
        <v-card-title>Course Schedule View</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Semester:</v-list-item-title>
                <v-list-item-subtitle>{{ courseSchedule.semester }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Date From:</v-list-item-title>
                <v-list-item-subtitle>{{ courseSchedule.dateFrom }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Date To:</v-list-item-title>
                <v-list-item-subtitle>{{ courseSchedule.dateTo }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Term:</v-list-item-title>
                <v-list-item-subtitle>{{ courseSchedule.term }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Created At:</v-list-item-title>
                <v-list-item-subtitle>{{ courseSchedule.createdAt }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Updated At:</v-list-item-title>
                <v-list-item-subtitle>{{ courseSchedule.updatedAt }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="goBack" color="primary">Go Back</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        courseSchedule: {
          semester: 'Spring 2023',
          dateFrom: '2023-01-15',
          dateTo: '2023-05-15',
          term: 'Spring Term',
          createdAt: '2023-01-10',
          updatedAt: '2023-01-15',
        },
      };
    },
    methods: {
      goBack() {
       
      },
    },
  };
  </script>
  
  <style scoped>
  </style>