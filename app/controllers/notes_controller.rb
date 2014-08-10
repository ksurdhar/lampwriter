class NotesController < ApplicationController

  def create
    @note = Note.new(note_params)

    if @note.save
      render json: @note
    else
      render json: @note.errors.full_messages, status: 402
    end
  end

  def destroy
    @note = Note.find(params[:id])
    @note.destroy
    render "notes/show"
  end

  def index
    @notes = Note.all
    render "notes/index"
  end

  def show
    @note = Note.find(params[:id])
    render "notes/show"
  end

  def update
    @note = Note.find(params[:id])
    @note.update_attributes(relationship_params)
    render "notes/show"
  end

  private
  def note_params
    params.require(:note).permit(:title, :body, :public)
  end
end
