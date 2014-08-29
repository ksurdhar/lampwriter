class Note < ActiveRecord::Base
  belongs_to :user
  before_save :set_html_body, :default_title

  def set_html_body
    if self.body
      self.html_body = body.gsub(/\n/, '<br/>')
    end
  end

  def default_title
    if !self.title || self.title.length == 0
      self.title = "Untitled"
    end
  end
end
