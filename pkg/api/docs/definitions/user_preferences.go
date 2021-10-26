package apidocs

import "github.com/grafana/grafana/pkg/api/dtos"

// swagger:route GET /user/preferences user_preferences getUserPreferences
//
// Get user preferences.
//
// Responses:
// 200: getUserPreferencesResponse
// 401: unauthorisedError
// 500: internalServerError

// swagger:route PUT /user/preferences user_preferences updateUserPreferences
//
// Update user preferences.
//
// Omitting a key (`theme`, `homeDashboardId`, `timezone`) will cause the current value to be replaced with the system default value.
//
// Responses:
// 200: okResponse
// 400: badRequestError
// 401: unauthorisedError
// 500: internalServerError

// swagger:parameters updateUserPreferences
type UpdateUserPreferencesParam struct {
	// in:body
	Body UpdatePrefsCmd `json:"body"`
}

// swagger:response getUserPreferencesResponse
type GetUserPreferencesResponse struct {
	// in:body
	Body dtos.Prefs `json:"body"`
}

// UpdatePrefsCmd is same as dtos.UpdatePrefsCmd but with swagger annotations
// swagger:model
type UpdatePrefsCmd struct {
	// Enum: light,dark,
	Theme string `json:"theme"`
	// The numerical :id of a favorited dashboard
	// Default:0
	HomeDashboardID int64 `json:"homeDashboardId"`
	// Enum: utc,browser,
	Timezone string `json:"timezone"`
}