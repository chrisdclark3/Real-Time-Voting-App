class VotesController < ApplicationController

	skip_before_filter :verify_authenticity_token

  def index
  	@votes = Vote.all
  	render json: @votes
  end

  def update
  	vote_count = Vote.find(params[:id]).count
  	Vote.update(params[:id], count: vote_count + 1)
  	@votes = Vote.all
  	render json: @votes
  end
end
