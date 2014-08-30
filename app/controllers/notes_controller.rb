class NotesController < ApplicationController

  def create
    @note = Note.new(note_params)
    @note.user_id = current_user.id
    if @note.save
      render "notes/show"
    else
      render json: @note.errors.full_messages, status: 402
    end
  end

  def destroy
    @note = current_user.notes.find(params[:id])
    @note.destroy
    render "notes/show"
  end

  def index
    if params[:sort_by] == "title"
      @notes = Note.paginate(:page => params[:current_page], :per_page => params[:page_size]).order(params[:sort_by] => :asc)
    else
      @notes = Note.paginate(:page => params[:current_page], :per_page => params[:page_size]).order(:created_at => :desc)
    end
    render "notes/index"
  end

  def show
    @note = Note.find(params[:id])
    render "notes/show"
  end

  def update
    @note = current_user.notes.find(params[:id])
    @note.update_attributes(note_params)
    render "notes/show"
  end

  private
  def note_params
    params.fetch(:note, {}).permit(:title, :body, :public)
  end
end
